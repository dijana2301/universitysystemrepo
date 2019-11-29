package ba.telegroup.university_system.repository.repositoryCustom.repositoryImpl;

import ba.telegroup.university_system.model.modelCustom.StudyProgramCollege;
import ba.telegroup.university_system.repository.repositoryCustom.StudyProgramRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class StudyProgramRepositoryImpl implements StudyProgramRepositoryCustom {

    private static final String SQL_GET_ALL_CUSTOM = "select s.*,c.name as college_name from study_program s inner join college c on s.college_id=c.id where s.active=1";

    private static final String SQL_GET_BY_ID_CUSTOM = "select s.*,c.name as college_name from study_program s inner join college c on s.college_id=c.id where s.active=1 and s.id=?";

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<StudyProgramCollege> getAllCustom() {
        Query query = entityManager.createNativeQuery(SQL_GET_ALL_CUSTOM, "StudyProgramCollegeMapping");
        return query.getResultList();
    }

    @Override
    public StudyProgramCollege getByIdCustom(Integer id) {
        Query query = entityManager.createNativeQuery(SQL_GET_BY_ID_CUSTOM, "StudyProgramCollegeMapping");
        query.setParameter(1, id);
        if (query.getResultList() == null || query.getResultList().isEmpty())
            return null;
        return (StudyProgramCollege) query.getResultList().get(0);
    }
}
