import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    redirectTo,
    remember: remember === "on" ? true : false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/_static/signin.png"
                alt="wizduds wizard conjuring a customized shirt for your dungeons and dragons campaign character"
              />
              <div className="absolute inset-0 bg-[color:rgba(255,56,56,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-red-700 drop-shadow-md">
                  Wizduds
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Customized apparel as unique as you.
              </p>
            </div>
            <div className="relative mx-auto w-full max-w-md px-8 z-40">
              <Form method="post" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      ref={emailRef}
                      id="email"
                      required
                      autoFocus={true}
                      name="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={actionData?.errors?.email ? true : undefined}
                      aria-describedby="email-error"
                      className="w-full rounded border border-black-500 px-2 py-1 text-lg"
                    />
                    {actionData?.errors?.email ? (
                      <div className="pt-1 text-red-700" id="email-error">
                        {actionData.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-white"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        ref={passwordRef}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        aria-invalid={actionData?.errors?.password ? true : undefined}
                        aria-describedby="password-error"
                        className="w-full rounded border border-black-500 px-2 py-1 text-lg"
                      />
                      {actionData?.errors?.password ? (
                        <div className="pt-1 text-red-700" id="password-error">
                          {actionData.errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <input type="hidden" name="redirectTo" value={redirectTo} />
                  <div>
                    <button
                      type="submit"
                      className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-400"
                    >
                      Log in
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-black-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 block text-sm text-white"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-center text-sm text-white">
                      Don't have an account?{" "}
                      <Link
                        className="text-white underline"
                        to={{
                          pathname: "/join",
                          search: searchParams.toString(),
                        }}
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
    </div>
  );
}
