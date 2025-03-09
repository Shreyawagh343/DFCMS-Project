import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await axios.post('http://localhost:4001/users/LoginCode', {
        email,
        password,
      });

      if (res.data) {
        localStorage.setItem('authtoken', res.data.token);
        localStorage.setItem('users', JSON.stringify(res.data.user));
        toast.success('Successfully logged in!');
        navigate(res.data.redirectUrl || '/dashboard');
      }
    } catch (err) {
      if (err.response) {
        toast.error('Error: ' + err.response.data.message);
      } else {
        toast.error('Network error. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md">
        <Tabs defaultValue="account" className="w-full">
          {/* <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Login</TabsTrigger>
          </TabsList> */}
          <TabsContent value="account">
            <Card className="shadow-xl rounded-xl border border-gray-300 bg-white">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-800">Welcome Back!</CardTitle>
                <CardDescription className="text-gray-600">
                  Log in to securely access your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      {...register('email', {
                        required: 'This field is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                    )}
                  </div>

                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Login
                  </Button>

                  <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signin" className="text-indigo-600 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default LoginPage;
