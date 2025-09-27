import { Button, FormGroup, TextField } from '@mui/material';
import { loginSx } from '@/features/auth/ui/Login/LoginSx.style';
import s from '@/features/auth/ui/Login/Login.module.css';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { LoginFormInputs, CaptchaProps } from '@/shared/types';

interface CaptchaPropsInternal extends Omit<CaptchaProps, 'url'> {
  captchaUrl: string;
  register: UseFormRegister<LoginFormInputs>;
  errors: FieldErrors<LoginFormInputs>;
  refetch: () => void;
}

export const Captcha = ({ captchaUrl, register, errors, refetch }: CaptchaPropsInternal) => {
  return (
    <FormGroup sx={{ mt: 2 }}>
      <img
        src={captchaUrl}
        alt="captcha"
        style={{ borderRadius: '8px', marginBottom: '10px', maxWidth: '200px' }}
      />

      <TextField
        error={!!errors?.captcha}
        {...register('captcha')}
        label="Enter symbols from image"
        sx={loginSx}
        margin="normal"
      />

      {errors?.captcha && <span className={s.errorMessage}>{errors.captcha.message}</span>}

      <Button onClick={refetch} variant="outlined" size="small" sx={{ mt: 1 }}>
        Refresh Captcha
      </Button>
    </FormGroup>
  );
};
