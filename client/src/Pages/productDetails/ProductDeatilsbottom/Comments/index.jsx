import { Box, Button, Rating, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import notify from "../../../../Utils/notify"


export default function Comments({ productId }) {
  const { token, user } = useSelector(state => state.auth)
  const [commentContent, setCommentContent] = useState('نظر خود را بنويسيد...');
  const [rating, setRating] = useState(0)
  const [productComments, setProductComments] = useState([])
  const [newComment, setnewComment] = useState(true);


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user && token) {
    try {
      const res = await fetch(import.meta.env.VITE_BASE_API + `comment/${productId}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: JSON.stringify({ content: commentContent, rating, productId }),
      });
      const data = await res.json();
      setCommentContent('نظر خود را بنويسيد...')
      setRating(0)
      if (data?.success) {
        notify("success", data?.message)
        setnewComment(!newComment)
      } else {
        notify("error", "چيزي ننوشتي :(")
      }
    } catch (error) {
      console.log(error);
    }}else{
      notify("error", "لطفا وارد حساب خود شوید")
    }
  }


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + `comment/${productId}?sort=-createdAt`);
        const data = await res.json();
        if (data?.success) {
          setProductComments(data?.data?.comments)
        }
      } catch (error) {
        console.log(error);

      }
    })()

  }, [newComment]);

  return (
    <>
      {/* start view comments */}
      {productComments.length!=0 && (<Stack
        gap={2}
     
        width={{
          xs: '100%', md: '85%', xl: '60%'
        }}
        maxHeight={{xs:'200px',sm:'380px'}}
        overflow={'scroll'}
       
      >
        <Typography variant='h3'
          fontSize={{ xs: '18px', sm: '24px' }}
          fontWeight={500}
        >نظرات</Typography>
        {productComments?.map(e=>(
        <Stack key={e?._id}
          direction={'row'}
          boxShadow={'0px 1px 2px 1px rgba(0,0,0,.2)'}
          borderRadius={'8px'}
          p={{ xs: '12px', xxs: '16px', sm: '24px' }}
          gap={{ xs: 1.5, sm: 3 }}
          m={1}
        >
          
            <>
            {/* start user info */}
                <Stack
            alignItems={'center'}
            gap={1}
          >
            <Box
              sx={{
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }
              }}
              width={{ xs: '50px', sm: '100px' }}
              height={{ xs: '50px', sm: '100px' }}
              borderRadius={'50%'}
              overflow={'hidden'}
            >
              <img src={import.meta.env.VITE_BASE_URL+e?.userId?.img} alt="profile photo" />
            </Box>
            <Typography variant='body2'
              fontSize={{ xs: '12px', sm: '16px' }}
              fontWeight={500}
            >{e?.userId?.fullName}</Typography>
          </Stack>
          {/* end user info */}

          {/* start user comment */}
          <Stack
            width={'100%'}
            gap={2}
          >
            <Stack
              direction={{ xs: 'column', xxs: 'row' }}
              justifyContent={'space-between'}
              alignItems={'center'}
              width={'100%'}
              gap={1}
            >
              <Typography
                variant='body1'
                fontSize={{ xs: '12px', sm: '14px' }}
                lineHeight={'14px'}
              >{e?.createdAt?.split('T')[0]}</Typography>
              <Rating size='small' value={e?.rating} readOnly />
            </Stack>
            <Stack>
              <Typography
                fontSize={{ xs: '12px', sm: '16px' }}
                textAlign={'justify'}
              >{e?.content}</Typography>
            </Stack>
          </Stack>
          {/* end user comment */}
            </>
         
      
        </Stack>
         ))}
      </Stack>)}
      
      {/* end view comments */}

      {/* start create comment */}
      <Stack
        gap={2}
        width={{
          xs: '100%', sm: '90%', md: '85%', xl: '60%'
        }}
        mt={productComments?.length!=0 ? 6 :0}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant='h3'
            fontSize={{ xs: '18px', sm: '24px' }}
            fontWeight={500}
            mb={1.5}
          >نظر شما:</Typography>
          <Stack
            borderRadius={'8px'}
            gap={1}
          >
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
            >
              <input placeholder='نام كاربر:'
                style={{
                  width: '40%',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  outline: 'none',
                  border: '1px solid rgba(0,0,0,.2)'
                }}
                readOnly
                value={user?.fullName || user?.email || 'براي ثبت نظر بايد وارد سايت شويد.'}
              ></input>
              <Rating
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  direction: 'ltr'
                }}
                size={'medium'}
                precision={.5}
              />
              <Rating
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                sx={{
                  display: { sm: 'none' },
                  direction: 'ltr'
                }}
                size={'small'}
                precision={.5}
              />
            </Stack>
            <textarea
              required
              value={commentContent}
              onFocus={() => setCommentContent(' ')}
              onChange={(e) => setCommentContent(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: '150px',
                maxHeight: '150px',
                padding: '8px 16px',
                borderRadius: '8px',
                outline: 'none',
                boxShadow: '0',
                border: '1px solid rgba(0,0,0,.2)',
                fontSize: '14px',
                color: 'rgba(0,0,0,0.9)'
              }}
            >
            </textarea>
            <Button
              type='submit'
              variant='contained'
              sx={{
                bgcolor: 'var(--secondary-clr)',
                width: 'fit-content',
                borderRadius: '8px',
                padding: { xs: '4px 12px', sm: '8px 24px' },
                fontSize: '16px'
              }}
              color='info'

            >
              ارسال
            </Button>
          </Stack>
        </form>
      </Stack>
      {/* end create comment */}
    </>
  )
}
