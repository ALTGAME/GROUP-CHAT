

import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
   // const [pic, setPic] = useState();
   const [loading, setLoading] = useState(false);

   const toast = useToast(); 
   const history = useHistory();


    const postDetails = (pics)=> {

    };

    const submitHandler = async()=> {
      setLoading(true);
      if( !email || !password ){
          toast({
          title: 'Fill the credentials',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;

      }
      
      try {
        const config ={
          headers: {
            "Content-type": "application/json",
          },
        };

        const {data} = await axios.post("/api/user",{ email,password},
         config
         );
           toast({
          title: 'Login Successful',
          status: 'sucess',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

        setLoading(false);
        history.push('/chats')


      } catch (error) {
          toast({
          title: 'Error ',
          description: error.respose.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        
      }
    };


  return (
    <VStack spacing={'5px'} color={'black'}>
         <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
             placeholder='Enter Your Email'
             onChange={(e)=> setEmail(e.target.value)}
            
            />
        </FormControl>
         <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input 
             type='Password'
             placeholder='Enter Your password'
             onChange={(e)=> setPassword(e.target.value)}
            
            />
            <InputRightElement width={'4.5em'}>
                <Button h={'1.75rem'} size ='sm'>
                     {show ? "Hide": "Show"} 

                </Button>
            </InputRightElement>


            </InputGroup>
            
        </FormControl>
         
        <Button
            colorScheme = "blue"
            width ="100%"
            style = {{marginTop: 15}}
            onClick = {submitHandler} 
            isLoading = {false}
            >

            Login 
  </Button> 
  <Button variant ="solid"
      colorScheme ="red"
      width = "100%"
      onClick = {() =>  {
        setEmail("guest@example.com");
        setPassword("123456");
      }}>
      
      Guest User
    </Button> 
            
      
    </VStack>
  )
};




export default Login;
