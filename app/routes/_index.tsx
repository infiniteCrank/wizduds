import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

export const meta: V2_MetaFunction = () => [{ title: "Wizduds custom apparel - customized cloths that are as unique as you" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-black sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/_static/login.png"
                alt="wizduds wizard conjuring a customized shirt for your DnD campaign character"
              />
              <div className="absolute inset-0 bg-[color:rgba(255,56,56,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <img
                      src="/_static/logo.png"
                      alt="Wizduds logo customized fantasy apparel lets see what we can conjure up."
                      className="w-full"
                    />
              <p className="mx-auto py-2 mt-2 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Customized apparel as unique as you.
              </p>

              <div className="mx-auto mt-5 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-red-700 shadow-sm hover:bg-red-50 sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-3 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                    >
                      <img
                        src="/_static/signup.png"
                        alt="Sign up to create your customized fantasy shirt with many editable designs to choose from"
                        className="mx-auto mt-5 w-full max-w-[12rem] md:max-w-[16rem]"
                      />
                    </Link>
                    <Link
                      to="/login"
                    >
                      <img
                        src="/_static/loginbutton.png"
                        alt="Login to wizduds to view your past creations and buy more unique t shirts and apparel"
                        className="mx-auto mt-5 w-full max-w-[12rem] md:max-w-[16rem]"
                      />
                    </Link>
                    <Link
                      to="/gallery"
                    >
                      <img
                        src="/_static/gallery-link-large.png"
                        alt="Check out our fantastic gallery of customizable character art to create your t-shirt"
                        className="mx-auto mt-5 w-full max-w-[12rem] md:max-w-[16rem]"
                      />
                    </Link>
                  </div>
                )}
              </div>

              <img
                      src="/_static/spider-hr-top.png"
                      alt="spider design this could be on your next shirt"
                      className="mx-auto sm:max-w-3xl"
                    />
              <p className="mx-auto max-w-lg bg-red-700/60 p-8 text-center text-m text-white sm:max-w-3xl">
                Design the clothing you wear and be a part of your fashion.
                You no longer have to wear the bland cloths you find on the rack. 
                Find a cool design you like wether your into anime, dragons, fairies, elves, or just cool art
                you can find a design that fits your style. Then change colors and design aspects to make it you.
                We are constantly adding new designs and apparel options. Dress your self from head to toe with Wizduds.
              </p>
              <img
                      src="/_static/spider-hr-bottom.png"
                      alt="Spider web design for shirt sleave or long sleave t-shirt"
                      className="mx-auto sm:max-w-3xl"
                    />

              <p className="mx-auto mt-6 max-w-lg bg-red-600/60 p-8 text-center text-m text-white sm:max-w-3xl">
                wizduds is a clothing line that allows the wearer to customize and change clothing that they buy.
                With wizduds you can select the art you want on your clothing tweek the colors and design elements and print it to a fashionable garment.
                If you like spending hours designing avatars for the games you play you will love wizduds. 
                Wiz duds is perfect for DnD character art and when your done building your character you can print it to a shirt. 
                If you ever wanted a shirt that no one else has wizduds is for you. even if someone else has the same design as you you can have a 
                different color pallet altogether. 

              Welcome to a world where you can conjure the way your cloths look so that can be as unique as you.
              Choose a design from a myriad  of fantasy and sci-fi character designs.
              Each character design can be changed with our advanced avatar editor.
              The editor allows you to conjure new hair styles, cloths, weapons, skin color, eyes, faces, backgrounds, prop colors and more!
              When your creation is finished you can have it magically imbued on the apparel of your choice
              Choose from T-shirts, Dresses, Shoes, Headbands, Socks, Jeans, Shorts, Bathing Suits, Swim Shorts, Head Wear, Hats
              Imagine sporting your DnD character on your shirt your next campaign. When people ask where you got that cool shirt tell them its wizduds!
              Choose from characters from different genres like Japanese anime, fantasy, and science fiction we are adding new designs every day.
              Make sure to sign up for updates so you can be the first to see new content in our gallery. 
              <Link
                to="/gallery"
                >
                <img
                  src="/_static/gallery-link.png"
                  alt="Enter our gallery of customizable designs and conjure your next new outfit"
                  className="mx-auto mt-5 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
