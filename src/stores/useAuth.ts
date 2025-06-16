import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

interface UserProfile {
    id: string;
    email: string;
    role: string;
}

interface AuthState {
    user: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchProfile: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    loading: true,

    login: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await useAuth.getState().fetchProfile();
    },

    register: async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        // No se loguea automáticamente, espera verificación por email
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
    },

    fetchProfile: async () => {
        set({ loading: true });
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("id, username, role")
                .eq("id", session.user.id)
                .single();

            set({ user: { ...profile, email: session.user.email }, loading: false });
        } else {
            set({ user: null, loading: false });
        }
    },
}));
