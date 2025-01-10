import { Button } from '@mui/material'
import React from 'react'
import './style.css'

export default function ChooseVariants({productVariantIds,handleSelectedVariant,selectedVariant}) {
      const variantToChoose = productVariantIds?.map((variant, index) => (
            <Button key={index}
            className={`variant-button ${(selectedVariant===index) && 'isSelectedVariant'}`}
            disabled={variant.quantity==0}
            onClick={()=>handleSelectedVariant(index,variant?._id)}
            sx={{
                bgcolor:'rgb(192, 174, 176)',
                color:'black',
                '&:disabled':{
                    opacity:.6,
                    color:'white'
                },
            }}
            >
                {variant?.name}
            </Button>
        ))
    
  return (
    variantToChoose
  )
}
