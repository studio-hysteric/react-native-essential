import React, { useState } from 'react';
import Box from '../box/Box';
import { Button } from '../button';
import { ControlledInput } from '../input';
import { IconSvg } from '../icon-svg/IconSvg';
import R from '@/assets';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Alert } from 'react-native';
import { useI18n } from '@/shared/hooks/useI18n';

const schema = z.object({
  email: z
    .string({
      required_error: 'form.login.email_error_empty',
    })
    .email('form.login.email_error_invalid'),
  password: z
    .string({
      required_error: 'form.login.pass_error_empty',
    })
    .min(6, 'form.login.pass_error_min_length'),
});

type FormType = z.infer<typeof schema>;

const FormHandle = () => {
  const { t } = useI18n();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const [isSecurePasswordInput, setIsSecurePasswordInput] = useState(true);

  const handleToggleSecurePasswordInput = () => {
    setIsSecurePasswordInput((prev) => !prev);
  };

  const onSubmit: SubmitHandler<FormType> = (data) => {
    Alert.alert(JSON.stringify(data));
  };

  const renderStartIconPasswordInput = (color: string) => {
    return <IconSvg color={color} source={R.icons.ic_password} />;
  };

  const renderEndIconPasswordInput = (color: string) => {
    return (
      <IconSvg
        onPress={handleToggleSecurePasswordInput}
        color={color}
        source={
          isSecurePasswordInput ? R.icons.ic_eye_close : R.icons.ic_eye_open
        }
      />
    );
  };

  return (
    <Box p={15}>
      <Box gap={10}>
        <ControlledInput
          control={control}
          name="email"
          label={t('form.login.email_label')}
          placeholder="example@gmail.com"
        />
        <ControlledInput
          control={control}
          name="password"
          label={t('form.login.password_label')}
          placeholder={t('form.login.pass_placeholder')}
          secureTextEntry={isSecurePasswordInput}
          startIcon={renderStartIconPasswordInput}
          endIcon={renderEndIconPasswordInput}
        />
      </Box>
      <Button mt={20} wFull onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Box>
  );
};

export default FormHandle;
