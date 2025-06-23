// src/components/HotelSelect.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Hotel {
    id: string;
    nombre: string;
}

interface HotelSelectProps {
    hotelId: string;
    setHotelId: (id: string) => void;
}

export const HotelSelect: React.FC<HotelSelectProps> = ({ hotelId, setHotelId }) => {
    const [hotels, setHotels] = useState<Hotel[]>([]);

    useEffect(() => {
        const fetchHotels = async () => {
            const { data, error } = await supabase.from("hotels").select("id, nombre");

            if (error) {
                console.error("❌ Error al cargar hoteles:", error.message);
            } else {
                setHotels(data || []);
            }
        };

        fetchHotels();
    }, []);

    return (
        <select
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            required
            className="border rounded px-2 py-1 w-full"
        >
            <option value="">Selecciona un hotel</option>
            {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                    {hotel.nombre}
                </option>
            ))}
        </select>
    );
};
