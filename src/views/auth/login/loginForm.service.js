class LoginFormService {

  /**
   *
   * @param $translate
   * @ngInject
   */
  constructor($translate) {
    this.fields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: $translate.instant('AUTH.LOGIN.EMAIL'),
          required: $translate.instant('AUTH.LOGIN.EMAIL'),
        },
        ngModelElAttrs: {
          'ng-model-options': `{updateOn: 'blur'}`,
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: $translate.instant('AUTH.LOGIN.PASSWORD'),
          required: $translate.instant('AUTH.LOGIN.PASSWORD'),
        },
        ngModelElAttrs: {
          'ng-model-options': `{updateOn: 'blur'}`,
        },
      },
    ]
  }
}

export {
  LoginFormService,
}
