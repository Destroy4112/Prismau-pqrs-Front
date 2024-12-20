import React from 'react'
import ContainerLogin from '../../components/login/ContainerLogin'
import LogoLogin from '../../components/login/LogoLogin'
import FormLogin from '../../components/login/FormLogin'
import useLogin from '../../hooks/useLogin'

function LoginPage() {

  const { usuario, loading, visible, toggleVisible, handleChange, handleSubmit } = useLogin();

  return (
    <ContainerLogin>
      <LogoLogin />
      <FormLogin loading={loading} usuario={usuario} handleChange={handleChange}
        visible={visible} toggleVisible={toggleVisible} handleSubmit={handleSubmit} />
    </ContainerLogin>
  )
}

export default LoginPage