import React, {useState} from 'react';
import ProfileNav from '../../User/ProfileNav'

export default function AddProductForm(){


    return(
        <>
        <ProfileNav/>

        <div>
            <form>
                <h1>React File Upload</h1>
                <input type="file" />
                <button type="submit">Upload</button>
            </form>
        </div>
        </>
    )
}