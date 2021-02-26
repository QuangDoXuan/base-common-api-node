import { SubjectController } from '../controller/subject.controller';
const subjectController = new SubjectController();
export default [
  {
    method: 'get',
    route: '/api/subject',
    middleware: [],
    controller: SubjectController,
    action: subjectController.index,
  },
  {
    method: 'post',
    route: '/api/subject',
    middleware: [],
    controller: SubjectController,
    action: subjectController.index,
  }
];
