import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './redux/AuthSlice';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

interface RegistrationForm {
  userName: string;
  email: string;
  name: string;
  surname: string;
  password: string;
}

const AuthForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationForm>({
    userName: '',
    email: '',
    name: '',
    surname: '',
    password: '',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isRegistering) {
      setFormData({ ...formData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formDataForToken = new URLSearchParams();
      formDataForToken.append('grant_type', 'password');
      formDataForToken.append('username', loginData.email);
      formDataForToken.append('password', loginData.password);
      formDataForToken.append('client_id', 'KotonMemberId');
      formDataForToken.append('client_secret', 'kotonsecret');

      const tokenResponse = await axios.post('https://localhost:5001/connect/token', formDataForToken, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Decode the token
      const decoded = jwtDecode(tokenResponse.data.access_token);
      
      // Redux'a token ve email kaydetme
      dispatch(login({
        token: tokenResponse.data.access_token,
        email: loginData.email, // assuming 'sub' contains email or user ID
      }));

      setSuccess('Giriş başarılı!');
      navigate(-1);
    } catch (error) {
      setError('Giriş sırasında bir hata oluştu.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post('https://localhost:5001/api/Register', {
        userName: formData.userName,
        email: formData.email,
        name: formData.name,
        surname: formData.surname,
        password: formData.password,
      });

      // Kayıt başarılı olursa giriş işlemi yapılır
      const formDataForToken = new URLSearchParams();
      formDataForToken.append('grant_type', 'password');
      formDataForToken.append('username', formData.email);
      formDataForToken.append('password', formData.password);
      formDataForToken.append('client_id', 'KotonMemberId');
      formDataForToken.append('client_secret', 'kotonsecret');

      const tokenResponse = await axios.post('https://localhost:5001/connect/token', formDataForToken, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Decode the token
      const decoded = jwtDecode(tokenResponse.data.access_token);

      // Redux'a token ve email kaydetme
      dispatch(login({
        token: tokenResponse.data.access_token,
        email: decoded.sub || formData.email, // assuming 'sub' contains email or user ID
      }));
      
      setSuccess('Kayıt başarılı!');
      navigate(-1);
    } catch (error) {
      setError('Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <Container 
      maxWidth="xs" 
      sx={{ backgroundColor: 'black', padding: 4, borderRadius: 2 }}
    >
      <img 
        src="https://054308f5.cdn.akinoncloud.com/static_omnishop/koton422/img/logo.svg" 
        alt="Koton Logo" 
        style={{ display: 'block', margin: '0 auto 20px auto', maxWidth: '100%', height: 'auto' }} 
      />
      <Typography 
        variant="h4" 
        component="h2" 
        align="center" 
        gutterBottom 
        sx={{ color: 'white' }}
      >
        {isRegistering ? 'Kullanıcı Kayıt Sayfası' : 'Giriş Yap'}
      </Typography>
      <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
        {isRegistering ? (
          <>
            {['userName', 'email', 'name', 'surname', 'password'].map((field, index) => (
              <TextField
                key={index}
                fullWidth
                margin="normal"
                label={field === 'userName' ? 'Kullanıcı Adı' :
                       field === 'email' ? 'E-posta' :
                       field === 'name' ? 'Ad' :
                       field === 'surname' ? 'Soyad' : 'Şifre'}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                value={formData[field as keyof RegistrationForm]}
                onChange={handleChange}
                required
                InputLabelProps={{
                  sx: {
                    color: 'gray',
                    '&.Mui-focused': {
                      color: 'white',
                    },
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'gray',
                    },
                    '&:hover fieldset': {
                      borderColor: 'gray',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                    input: {
                      color: 'white',
                    },
                  },
                }}
              />
            ))}
          </>
        ) : (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="E-posta"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              required
              InputLabelProps={{
                sx: {
                  color: 'gray',
                  '&.Mui-focused': {
                    color: 'white',
                  },
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'gray',
                  },
                  '&:hover fieldset': {
                    borderColor: 'gray',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                  input: {
                    color: 'white',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Şifre"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              required
              InputLabelProps={{
                sx: {
                  color: 'gray',
                  '&.Mui-focused': {
                    color: 'white',
                  },
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'gray',
                  },
                  '&:hover fieldset': {
                    borderColor: 'gray',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                  input: {
                    color: 'white',
                  },
                },
              }}
            />
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}
        </Button>
      </form>
      {!isRegistering && (
        <Button
          fullWidth
          color="secondary"
          sx={{ marginTop: 2 }}
          onClick={() => setIsRegistering(true)}
        >
          Kayıt Ol
        </Button>
      )}
      {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ marginTop: 2 }}>{success}</Alert>}
    </Container>
  );
};

export default AuthForm;
