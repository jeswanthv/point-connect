import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { auth, provider } from "../firebase";

function Login() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  return (
    <Wrapper>
      <Udiv>
        <UberLogo src="https://i.ibb.co/3J71cFq/Vector.png" />
        <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
      </Udiv>
      <Sdiv>
        <Title>Your ride, your choice</Title>
        <SignInButton onClick={() => signInWithPopup(auth, provider)}>
          Sign in with Google
        </SignInButton>
      </Sdiv>
    </Wrapper>
  );
}

export default Login;

const Wrapper = tw.div`
    flex flex-col h-screen p-4 items-center relative
`;
const Udiv = tw.div`
    flex flex-col items-center justify-center absolute top-60 w-full
`;

const Sdiv = tw.div`
    flex flex-col items-center justify-center absolute bottom-20 w-full
`;

const SignInButton = tw.button`
    bg-primary rounded text-white text-center py-4 self-center w-3/4
`;

const UberLogo = tw.img`
    h-20 w-auto object-contain
`;
const Title = tw.div`
    text-xl pt-4 text-center text-gray-500 
`;

const HeadImage = tw.img`
    object-contain w-full
`;
