export type WebsiteEnvironments = {
    production: string;
    staging: string;
    development: string;
    [key: string]: string;
};

export interface AppConfig {
    websites: {
        [websiteName: string]: WebsiteEnvironments;
    };
    defaultAgreementParameter: string;
}



