import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

export function LoginForm({className,...props}: React.ComponentProps<"div">)
{
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card >
       
         <CardHeader className="flex justify-around">
          <div>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          </div>
          <div>
         <CardDescription>
            <Link  href="/" className="flex items-end justify-end-safe">
           <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300">
            <Home className="w-5 h-5 " aria-hidden="true" />
           </div>
           </Link>
      </CardDescription>
      </div>
        </CardHeader>
       
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button>
                <Link href="/dashboard">
                  Login
                  </Link>
                  </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
           
        </CardContent>
      </Card>
      
    </div>
  )
}
