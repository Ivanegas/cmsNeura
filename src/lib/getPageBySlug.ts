import { supabase } from './supabaseClient';

export const getPageBySlug = async (slug: string) => {
    const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('❌ Error al buscar página por slug:', error.message);
        return null;
    }

    return data;
};
