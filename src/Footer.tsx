import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#333',
                color: 'white',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 'auto',
                textAlign: 'center',
            }}
        >
            {/* Koton Logo */}
            <Box sx={{ mb: 2 }}>
                <img
                    src="https://054308f5.cdn.akinoncloud.com/static_omnishop/koton422/img/logo.svg" // Koton logosu
                    alt="Koton Logo"
                    style={{ width: '150px', height: 'auto' }}
                />
            </Box>

            <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                Modayı Yakından Takip Edin
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Link
                    href="https://kurumsal.koton.com.tr/genel-bilgi/"
                    sx={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}
                    target="_blank" // Yeni sekmede açılmasını sağlar
                    rel="noopener noreferrer" // Güvenlik için eklenir
                >
                    Hakkımızda
                </Link>
                <Link
                    href="https://www.koton.com/iletisim"
                    sx={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    İletişim
                </Link>
                <Link
                    href="https://www.koton.com/kisisel-verilerin-korunmasi"
                    sx={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Gizlilik Politikası
                </Link>
                <Link
                    href="https://www.koton.com/hakkimizda"
                    sx={{ color: 'white', textDecoration: 'none', margin: '0 15px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Kullanım Şartları
                </Link>
            </Box>
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Koton. Tüm hakları saklıdır.
            </Typography>
        </Box>
    );
};

export default Footer;
