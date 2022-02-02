import React, {FC} from 'react';
import imageCircleIngredientStyles from "./image-circle-ingredient.module.css";

interface IImageCircleIngredient {
    image: string,
    ingredientCount?: number,
    index?: number
}

const ImageCircleIngredient: FC<IImageCircleIngredient> = ({image, ingredientCount, index}) => {
    const zIndex = index ? 10 - index : 11
    return (
        <div className={imageCircleIngredientStyles.wrapper} style={{zIndex: zIndex}}>
            <img src={image} alt='ingredients_image'/>
            {ingredientCount && (
                <div className={imageCircleIngredientStyles.count_container}>
                    <p className="text text_type_digits-default">+{ingredientCount - 5}</p>
                </div>
            )}
        </div>
    );
};

export default ImageCircleIngredient;