import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import MainContainer from '@/components/layouts/main-container';

export const metadata: Metadata = {
    title: {
        template: '%s | Simplileap - Multipurpose Dashboard',
        default: 'Simplileap - Multipurpose Dashboard',
    },
};
const nunito = Nunito({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-nunito',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={nunito.variable}>
                <AuthProvider>
                    <ProviderComponent>
                        <MainContainer>{children}</MainContainer>
                    </ProviderComponent>
                </AuthProvider>
            </body>
        </html>
    );
}
