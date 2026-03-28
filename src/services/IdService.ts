import {v4 as uuidv4} from 'uuid'

type IdVersion = 'v4'

export class IdService {
  public static generateId(version: IdVersion) {
    switch (version) {
      case 'v4':
        return uuidv4()
      default:
        throw new Error(`Unsupported version ${version}`)
    }
  }
}
