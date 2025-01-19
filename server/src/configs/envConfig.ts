import * as yup from 'yup';

const envConfigValidationSchema = yup.object().shape({
  NEON_PG_HOST: yup.string().required('Thiếu cấu hình biến môi trường cho NEON_PG_HOST'),
  NEON_PG_USER: yup.string().required('Thiếu cấu hình biến môi trường cho NEON_PG_USER'),
  NEON_PG_PASSWORD: yup.string().required('Thiếu cấu hình biến môi trường cho NEON_PG_PASSWORD'),
  NEON_PG_DATABASE: yup.string().required('Thiếu cấu hình biến môi trường cho NEON_PG_DATABASE'),
});

type EnvConfigSchema = yup.InferType<typeof envConfigValidationSchema>

export type TDataEnvConfig = Partial<EnvConfigSchema>

export const checkValidEnvVariables = (envData: TDataEnvConfig) => {
  try {
    envConfigValidationSchema.validateSync(envData, { abortEarly: false });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error('[ERROR] envConfig: ', error.errors);
    }
  }
}


