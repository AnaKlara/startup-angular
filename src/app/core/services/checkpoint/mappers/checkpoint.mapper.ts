import { CheckpointModel } from 'src/app/core/models/checkpoint.model';
import { Mapper } from 'src/app/shared/base/mapper';
import { CheckpointEntity } from '../entities/checkpoint-entity';

export class CheckpointMapper extends Mapper<CheckpointEntity, CheckpointModel> {
  mapFrom(param: CheckpointEntity): CheckpointModel {
    return {
      id: param.id,
      sonda: param.sonda,
      uo: param.uo,
      campo: param.campo,
      poco: param.poco,
      intervencao: param.intervencao,
      simulado: param.simulado,
      concluido: param.concluido,
      avaliacao: param.avaliacao,
      prazo: param.prazo,
    };
  }
  mapTo(param: CheckpointModel): CheckpointEntity {
    return {
      id: param.id,
      sonda: param.sonda,
      uo: param.uo,
      campo: param.campo,
      poco: param.poco,
      intervencao: param.intervencao,
      simulado: param.simulado,
      concluido: param.concluido,
      avaliacao: param.avaliacao,
      prazo: param.prazo,
    };
  }
}
