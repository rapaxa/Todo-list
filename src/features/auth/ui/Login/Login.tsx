import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from '@mui/material';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import s from './Login.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { authScheme } from '@/features/auth/lib/schemes/authScheme.ts';
import type { LoginFormInputs } from '@/shared/types';
import { useAppSelector } from '@/common/hooks/commonHooks/useAppSelector.ts';
import { Navigate } from 'react-router';
import { Path } from '@/common/routing/Path.ts';
import { useCaptchaQuery, useLoginMutation } from '@/features/auth/api/authApi.ts';
import { ResultCode } from '@/shared/enums';
import { useAppDispatch } from '@/common/hooks/commonHooks/useAppDispatch.ts';
import { loginTC, selectIsLoggedIn, selectLoading } from '@/app/model/app-slice.ts';
import { AUTH_TOKEN } from '@/common/constants';
import { loginSx } from '@/features/auth/ui/Login/LoginSx.style.ts';
import Link from '@mui/material/Link';
import { useState } from 'react';
import { Captcha } from '@/features/auth/ui/Login/Captcha/Captcha.tsx';

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: '', password: '', rememberMe: false, captcha: '' },
    resolver: zodResolver(authScheme),
  });

  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isLoading = useAppSelector(selectLoading);
  const [loginMutation] = useLoginMutation();
  const { data, refetch } = useCaptchaQuery();
  const captchaUrl = data?.url;
  const [needCaptcha, setNeedCaptcha] = useState(false);

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation(data).then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        if (data.rememberMe) {
          localStorage.setItem(AUTH_TOKEN, res.data.data.token);
        } else {
          sessionStorage.setItem(AUTH_TOKEN, res.data.data.token);
        }
        dispatch(loginTC({ isLoggedIn: true }));
        reset();
      } else if (res.data?.resultCode === 10) {
        refetch();
        setNeedCaptcha(true);
      }
    });
  };

  if (isLoggedIn) {
    return <Navigate to={Path.Main} />;
  }

  return (
    <Grid container justifyContent={'center'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: '#78909c', marginLeft: '5px' }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField
              error={!!errors.email}
              {...register('email')}
              label="Email"
              sx={(theme) => loginSx(theme)}
              margin="normal"
            />
            {errors.email && <span className={s.errorMessage}>{errors.email.message}</span>}

            <TextField
              error={!!errors.password}
              {...register('password')}
              type="password"
              sx={(theme) => loginSx(theme)}
              label="Password"
              margin="normal"
            />
            {errors.password && <span className={s.errorMessage}>{errors.password.message}</span>}

            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={'rememberMe'}
                  control={control}
                  render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                />
              }
            />

            {/* CAPTCHA */}
            {needCaptcha && captchaUrl && (
              <Captcha
                captchaUrl={captchaUrl}
                register={register}
                errors={errors}
                refetch={refetch}
              />
            )}

            <Button
              loading={isLoading == 'pending'}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Link href="https://social-network.samuraijs.com" underline="none">
              {'Forgot Password?'}
            </Link>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  );
};
