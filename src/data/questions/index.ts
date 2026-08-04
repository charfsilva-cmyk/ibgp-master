import { estatutoServidoresQuestions } from "./estatutoServidores";
import { leiOrganicaBrumadinhoQuestions } from "./leiOrganicaBrumadinho";
import { historiaBrumadinhoQuestions } from "./historiaBrumadinho";
import { geografiaBrumadinhoQuestions } from "./geografiaBrumadinho";
import { estatutoGcmQuestions } from "./estatutoGcm";
import { constitucionalQuestions } from "./constitucional";
import { ctbQuestions } from "./ctb";
import { direitosHumanosQuestions } from "./direitosHumanos";
import { informaticaQuestions } from "./informatica";
import { leiTorturaQuestions } from "./leiTortura";
import { penalQuestions } from "./penal";
import { portuguesQuestions } from "./portugues";
import { administrativoQuestions } from "./administrativo";
import { mariaPenhaQuestions } from "./mariaPenha";
import { ecaQuestions } from "./eca";
export const questions = [
  ...constitucionalQuestions,
  ...ctbQuestions,
  ...direitosHumanosQuestions,
  ...informaticaQuestions,
  ...leiTorturaQuestions,
  ...penalQuestions,
  ...portuguesQuestions,
  ...administrativoQuestions,
  ...mariaPenhaQuestions,
...ecaQuestions,
...estatutoGcmQuestions,
...historiaBrumadinhoQuestions,
...geografiaBrumadinhoQuestions,
...leiOrganicaBrumadinhoQuestions,
...estatutoServidoresQuestions,]