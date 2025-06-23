import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageBySlug } from '@/lib/getPageBySlug';

interface PageElement {
    id: string;
    type: string;
    content: string;
    styles?: Record<string, string>;
}

export const CMSPageRenderer = () => {
    const { slug } = useParams();
    const [htmlContent, setHtmlContent] = useState<string>('Cargando...');

    useEffect(() => {
        const loadPage = async () => {
            if (!slug) {
                setHtmlContent('<p>Error: slug no definido.</p>');
                return;
            }

            const page = await getPageBySlug(slug);

            if (!page) {
                setHtmlContent('<p>Error: Página no encontrada.</p>');
                return;
            }

            try {
                const parsed = JSON.parse(page.content);

                if (Array.isArray(parsed)) {
                    // viejo formato: solo array
                    setHtmlContent(renderElements(parsed));
                } else if (parsed.elements) {
                    setHtmlContent(renderElements(parsed.elements));
                } else {
                    setHtmlContent('<p>Contenido no válido.</p>');
                }
            } catch {
                // fallback: HTML plano (caso legacy)
                setHtmlContent(page.content);
            }
        };

        loadPage();
    }, [slug]);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};

// 🔧 Convierte estilos { color: "red", fontSize: "16px" } a "color:red;font-size:16px;"
const styleToString = (styles: Record<string, string> = {}) =>
    Object.entries(styles)
        .map(([key, val]) => `${toKebabCase(key)}:${val}`)
        .join(';');

const toKebabCase = (str: string) =>
    str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);

// 🔨 Genera HTML desde elementos JSON
const renderElements = (elements: PageElement[]) => {
    return elements
        .map((el) => {
            const style = styleToString(el.styles || {});
            switch (el.type) {
                case 'text':
                    return `<p style="${style}">${el.content}</p>`;
                case 'heading':
                    return `<h1 style="${style}">${el.content}</h1>`;
                case 'button':
                    return `<button style="${style}">${el.content}</button>`;
                case 'image':
                    return `<img src="${el.content}" style="${style}" />`;
                case 'video':
                    return `<div style="${style}">[Video: ${el.content}]</div>`;
                case 'list':
                    return `<ul style="${style}"><li>${el.content}</li></ul>`;
                default:
                    return `<div style="${style}">${el.content}</div>`;
            }
        })
        .join('');
};
