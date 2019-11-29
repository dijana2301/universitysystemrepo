package ba.telegroup.university_system.repository.repositoryCustom.repositoryImpl;

import ba.telegroup.university_system.model.modelCustom.StudentStudyProgram;
import ba.telegroup.university_system.repository.repositoryCustom.StudentRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class StudentRepositoryImpl implements StudentRepositoryCustom {

    private static final String SQL_GET_ALL_CUSTOM = "select s.*,sp.`name` as study_program_name, u.`name` as university_name from student s inner join study_program sp on s.study_program_id=sp.id inner join university u on s.university_id=u.id where sp.active=1";

    private static final String SQL_GET_BY_ID_CUSTOM = "select s.*,sp.`name` as study_program_name, u.`name` as university_name from student s inner join study_program sp on s.study_program_id=sp.id inner join university u on s.university_id=u.id where sp.active and s.id=?";


    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<StudentStudyProgram> getAllCustom() {
        Query query = entityManager.createNativeQuery(SQL_GET_ALL_CUSTOM, "StudentStudyProgramMapping");
        return query.getResultList();
    }

    @Override
    public StudentStudyProgram getByIdCustom(Integer id) {
        Query query = entityManager.createNativeQuery(SQL_GET_BY_ID_CUSTOM, "StudentStudyProgramMapping");
        query.setParameter(1, id);
        if (query.getResultList() == null || query.getResultList().isEmpty())
            return null;
        return (StudentStudyProgram) query.getResultList().get(0);
    }
}
