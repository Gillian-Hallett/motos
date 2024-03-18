import React, { useState } from 'react';
import 'antd/dist/antd.js';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'; // Importa los iconos necesarios
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/storelogin';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const onFinish = values => {
    const { usuario, contrasena } = values;

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, contrasena }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error de red');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert('Usuario registrado exitosamente.');
          dispatch(loginActions.login({ name: usuario }));
          navigate('/');
        } else if (data.error) {
          setError(data.error);
        } else {
          setError('Error desconocido');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('El nombre de usuario ya está en uso');
      });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

      <div style={{ width: 400 }}>

        <h1 style={{ textAlign: 'center' }}>Registro</h1>
        <Form
          name="normal_register"
          className="register-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="usuario"
            rules={[
              {
                required: true,
                message: '¡Por favor ingrese su nombre de usuario!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
          </Form.Item>
          <Form.Item
            name="contrasena"
            rules={[
              {
                required: true,
                message: '¡Por favor ingrese la contraseña!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Contraseña"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} // Icono de lupa para ver u ocultar la contraseña
            />
          </Form.Item>

          <Form.Item
            name="confirmarContrasena"
            dependencies={['contrasena']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '¡Por favor confirme su contraseña!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('contrasena') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Las contraseñas no coinciden.'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirmar contraseña"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} // Icono de lupa para ver u ocultar la contraseña
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Registrarse
            </Button>
            O ya tienes cuenta <a href="/Login">¡Inicia sesión ahora!</a>
          </Form.Item>
          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        </Form>
      </div>

    </div>
  )
}
