import Link from 'next/link';
import React from 'react';
import PolygonImage from '../../../../public/assets/images/auth/polygon-object.svg';
import Obj1 from '../../../../public/assets/images/auth/coming-soon-object1.png';
import Obj2 from '../../../../public/assets/images/auth/coming-soon-object2.png';
import Obj3 from '../../../../public/assets/images/auth/coming-soon-object3.png';
import GradImg from '../../../../public/assets/images/auth/bg-gradient.png';
import Image from 'next/image';
import ComponentsAuthLoginForm from '@/components/auth/components-auth-login-form';

const Login = () => {
    return (
        <div>
            <div className="absolute inset-0">
                <Image src={GradImg} alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <Image src={Obj1} alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <Image src={Obj2} alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <Image src={Obj3} alt="image" className="absolute right-0 top-0 h-[300px]" />
                <Image src={PolygonImage} alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50 ">
                        {/* <div className="absolute end-6 top-6">
                            <LanguageDropdown />
                            </div> */}
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <ComponentsAuthLoginForm />

                            <div className="my-7 text-center dark:text-white ">
                                Don&apos;t have an account ?&nbsp;
                                <Link href="/auth/signup" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    SIGN UP
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
