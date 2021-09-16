import Head from 'next/head';
import Image from 'next/image';
import NextLink from 'next/link';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Flex, Heading, Link, Stack, Text } from '@chakra-ui/layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsDot } from 'react-icons/bs';
import { FiLock, FiMail } from 'react-icons/fi';

import { useAuth } from 'hooks/useAuth';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

import guySvg from '../assets/guy.svg';
import laptopSvg from '../assets/laptop.svg';
import logo from '../assets/logo.svg';

type SignUpFormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().min(6, 'A senha deve possuir no mínimo 6 caracteres').required('Senha obrigatória'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'As senhas não são iguais')
});

export default function SignUp() {
  const { signUp } = useAuth();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignUp: SubmitHandler<SignUpFormData> = async (data) => {
    await signUp({
      email: data.email,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation
    });
  }

  return (
    <>
      <Head>
        <title>Timos | Cadastro</title>
      </Head>

      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify={{ base: 'center', md: 'space-around' }}
      >
        <Flex
          align="center"
          justify="center"
          direction="column"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Heading align="center" fontSize="3rem" mb="2">
            Bem-vindo(a) ao Timos!
          </Heading>
          <Text align="center" fontSize="1.2rem" fontWeight="medium">
            Não esqueça nunca mais de seus empréstimos.
          </Text>

          <Flex align="flex-start" mt="5">
            <Image src={guySvg} height={500} width={300} quality={100} className="floating" />
            <Image src={laptopSvg} height={200} width={200} quality={100} className="floating-reverse" />
          </Flex>
        </Flex>

        <Flex px={{ base: '5', md: '0' }}>
          <Flex
            as="form"
            w={{ base: '100%', md: 450 }}
            py="7"
            px={{ base: '6', md: '10' }}
            bg="blue.700"
            borderRadius="5"
            direction="column"
            onSubmit={handleSubmit(handleSignUp)}
          >
            <Stack spacing="4">
              <Image src={logo} width={80} height={80} />

              <Text 
                align="center"
                fontSize="1.5rem"
                fontWeight="medium"
              >
                Cadastro
              </Text>

              <Input 
                placeholder="E-mail" 
                type="email"
                w="100%"
                icon={FiMail}
                error={formState.errors.email}
                {...register('email')}
              />

              <Input 
                placeholder="Senha"
                type="password" 
                w="100%"
                icon={FiLock}
                error={formState.errors.password}
                {...register('password')}
              />

              <Input 
                placeholder="Confirmar senha"
                type="password" 
                w="100%"
                icon={FiLock}
                error={formState.errors.passwordConfirmation}
                {...register('passwordConfirmation')}
              />
            </Stack>

            <Stack spacing="4" align="center" mt="8">
              <Button 
                type="submit"
                title="Criar conta" 
                size="lg" 
                width={{ base: '100%', md: '50%' }}
              />

              <Flex width="100%" justify="space-between" align="center">
                <Divider borderColor="gray.300" width="45%" />
                <BsDot color="#CCCCCC" width="1.5" height="1.5" />
                <Divider borderColor="gray.300" width="45%" />
              </Flex>

              <Text color="gray.300" align="center">
                Já possui uma conta?  
                <NextLink href="/">
                  <Link color="blue.100" ml="1">
                    Entre agora
                  </Link>
                </NextLink>
              </Text>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}