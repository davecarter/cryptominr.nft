// Create a Domain singleton instance as an entry point
// const domain = DomainApp.create()
// The exposed API is camelCased:
// domain.nameOfUseCase.execute({ namedParams })
// All UseCases will always have just an execute method and they will return a promise

// More about using minimal API Surface Area pattern
// https://2014.jsconf.eu/speakers/sebastian-markbage-minimal-api-surface-area-learning-patterns-instead-of-frameworks.html

import * as blockchainUseCases from "./blockchain/useCases"

const useCases = {
  ...blockchainUseCases,
}

export class DomainApp {
  static create() {
    return new DomainApp()
  }

  constructor() {
    Object.entries(useCases).forEach(([key, value]) => {
      const useCaseName = key.charAt(0).toLowerCase() + key.slice(1)
      this[useCaseName] = this._getter(value)
    })
  }

  _getter(useCase) {
    return {
      async execute(...args) {
        const instance = await useCase.create()
        return instance.execute(...args)
      },
    }
  }
}
