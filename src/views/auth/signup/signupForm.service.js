class SignupFormService {

  /**
   *
   * @param $translate
   * @param $http
   * @param config
   * @ngInject
   */
  constructor($translate, $http, config) {
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
        asyncValidators: {
          uniqEmail: (viewValue, modelValue) => {
            let val = viewValue || modelValue
            return $http.get(`${config.api.basePath}/isAvailable/${val}`)
          },
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
      },
      {
        key: 'repeatPassword',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: $translate.instant('AUTH.SIGNUP.REPEATPASSWORD'),
          required: $translate.instant('AUTH.SIGNUP.REPEATPASSWORD'),
        },
        expressionProperties: {
          'templateOptions.disabled': ($viewValue, $modelValue, scope) => {
            return scope.model.password === '' || !scope.model.password
          },
        },
        validators: {
          samePassword: (viewValue, modelValue, $scope) => {
            let val = viewValue || modelValue
            return val === $scope.model.password
          },
        },
        validation: {
          messages: {
            samePassword: ()=> {
              return $translate.instant('AUTH.SIGNUP.VALIDATION.REPEATPASSWORD')
            },
          },
        },
      },
    ]
  }
}

export {
  SignupFormService,
}
