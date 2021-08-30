import React, {ComponentType} from 'react';
import {Preloader} from '../components/common/Preloader/Preloader';

export function withSuspense<T>(Component: ComponentType<T>) {
    return (props: any) => {
        let {...restProps} = props
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...restProps as T}/>
        </React.Suspense>
    }
}
