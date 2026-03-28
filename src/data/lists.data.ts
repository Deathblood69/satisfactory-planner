import {ListService} from '@/services/ListService'
import {ListDTO} from '@/dto/ListDTO'

export const listDTOS: ListDTO[] = [
  ListService.dtoToEntity({
    instance: 'A1B2C3',
    name: 'Cupcake',
    private: false
  }),
  ListService.dtoToEntity({instance: 'D4E5F6', name: 'Donut', private: true}),
  ListService.dtoToEntity({instance: 'G7H8I9', name: 'Eclair', private: false}),
  ListService.dtoToEntity({
    instance: 'J1K2L3',
    name: 'Frozen yoghurt',
    private: true
  }),
  ListService.dtoToEntity({
    instance: 'M4N5O6',
    name: 'Gingerbread',
    private: false
  }),
  ListService.dtoToEntity({
    instance: 'P7Q8R9',
    name: 'Honeycomb',
    private: true
  }),
  ListService.dtoToEntity({
    instance: 'S1T2U3',
    name: 'Ice cream sandwich',
    private: false
  }),
  ListService.dtoToEntity({
    instance: 'V4W5X6',
    name: 'Jelly Bean',
    private: true
  }),
  ListService.dtoToEntity({instance: 'Y7Z8A9', name: 'KitKat', private: false}),
  ListService.dtoToEntity({
    instance: 'B1C2D3',
    name: 'Lollipop',
    private: true
  }),
  ListService.dtoToEntity({
    instance: 'E4F5G6',
    name: 'Marshmallow',
    private: false
  }),
  ListService.dtoToEntity({instance: 'H7I8J9', name: 'Nougat', private: true}),
  ListService.dtoToEntity({instance: 'K1L2M3', name: 'Oreo', private: false})
]
