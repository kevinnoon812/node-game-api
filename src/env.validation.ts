import { plainToClass } from 'class-transformer';
import { IsEnum, validateSync } from 'class-validator';

enum Environment {
    Development = "development",
    Test = "test",
    Staging = "staging",
    Production = "production"
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToClass(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true },
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}