import LogoutButton from "@/components/LogoutButton";

const ViewerPage = () => {
    return (
        <div style={{ padding: 20 }}>
            <h1>👁️ Viewer Page</h1>
            <p>Bienvenido al panel de solo lectura.</p>
            <LogoutButton />
        </div>
    );
};

export default ViewerPage;
