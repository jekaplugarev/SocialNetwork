import React from "react";
import style from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                {/*<img src="https://imagesbase.ru/uploads/posts/2016-12/1481272915_imagesbase.ru-5254.jpg" alt="Main content"/>*/}
            </div>
            <div className={style.descriptionBlock}>
                Ava + Discription
            </div>
        </div>
    )
}

export default ProfileInfo;