import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmpassword, setConfirmpassword] =useState();
    const [pic, setPic] = useState();
   const [loading, setLoading] = useState(false);
   const toast = useToast();
   const history = useHistory();


    const postDetails = (pics)=> {
      setLoading(true);
      if(pics === undefined){
         toast({
          title: 'Choose an image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      

      }

      if(pics.type === "image/jpeg" || pics.type === "image/png"){
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "Parley-G");
        data.append("cloud_name","dkeikqwqo");
        fetch( "https://api.cloudinary.com/v1_1/dkeikqwqo",{
          method: 'post' , body: data,
        } ).then((res)=> res.json())
           .then(data => {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setLoading(false);

           })
           .catch((err) => {
            console.log(err);
            setLoading(false);
           });
      }else{
         toast({
          title: 'Choose an image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

      }


    };

    const submitHandler = async()=> {
      setLoading(true);
      if(!name || !email || !password || !confirmpassword){
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
      if (password !== confirmpassword) {
          toast({
          title: 'Password Do Not Match',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }

      try {
        const config ={
          headers: {
            "Content-type": "application/json",
          },
        };

        const {data} = await axios.post("/api/user",{name, email,password,pic},
         config
         );
           toast({
          title: 'Registration Successful',
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
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
             placeholder='Enter Your Name'
             onChange={(e)=> setName(e.target.value)}
            
            />
        </FormControl>
         <FormControl id='Email' isRequired>
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
             type='password'
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
         <FormControl id='Confirm password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
            <Input 
             type='password'
             placeholder='Confirm password '
             onChange={(e)=> setConfirmpassword(e.target.value)}
            
            />
            <InputRightElement width={'4.5em'}>
                <Button h={'1.75rem'} size ='sm'>
                     {show ? "Hide": "Show"} 

                </Button>
            </InputRightElement>


            </InputGroup>
         </FormControl>   
          <FormControl id='pic' >
            <FormLabel>Upload your picture</FormLabel>
            <Input 
             type='file'
             p={1.5}
             accept='image/*'
             onChange={(e)=> postDetails(e.target.files[0])}
            
            />
  </FormControl> 

        <Button
            colorScheme = "blue"
            width ="100%"
            style = {{marginTop: 15}}
            onClick = {submitHandler}
            isloading = "false"
            >

            Sign Up 
  </Button>  
            
      
    </VStack>
  )
};

export default Signup
