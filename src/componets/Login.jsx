import React from 'react';
import 'antd/dist/antd.js';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
//Importamos el useDispatch del react-redux
import { useDispatch } from 'react-redux'
//Importamos el componente loginActions que está en el fichero storelogin.js
import { loginActions } from '../store/storelogin';


export default function Login() {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const onFinish = values => {
    const { usuario, contrasena } = values;
    console.log(usuario, contrasena)
    fetch('http://localhost:5000/validateContrasena', {
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
        if (data.validation) {
          // Despachamos la acción de login
          dispatch(loginActions.login({ name: usuario }));
          alert('Usuario y contraseña correctos');
          navigate('/');
        } else {
          alert('Usuario o contraseña incorrectos. Inténtelo de nuevo');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde');
      });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

      <div style={{ width: 400 }}>

        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <Form
          name="normal_login"
          className="login-form"
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
                message: '¡Por favor ingrese su contraseña!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            O <a href="/Regis">¡Regístrate ahora!</a>
          </Form.Item>
        </Form>
      </div>


    </div>
  )
}
