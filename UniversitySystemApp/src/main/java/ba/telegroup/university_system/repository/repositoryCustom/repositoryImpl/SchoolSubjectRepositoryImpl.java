package ba.telegroup.university_system.repository.repositoryCustom.repositoryImpl;

import ba.telegroup.university_system.model.modelCustom.SchoolSubjectStudyProgram;
import ba.telegroup.university_system.repository.repositoryCustom.SchoolSubjectRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class SchoolSubjectRepositoryImpl implements SchoolSubjectRepositoryCustom {

    private static final String SQL_GET_ALL_CUSTOM = "select ss.*,sp.name as study_program_name from school_subject ss inner join study_program sp on ss.study_program_id=sp.id where ss.active=1";

    private static final String SQL_GET_BY_ID_CUSTOM = "select ss.*,sp.name as study_program_name from school_subject ss inner join study_program sp on ss.study_program_id=sp.id where ss.active=1 and ss.id=?";

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<SchoolSubjectStudyProgram> getAllCustom() {
        Query query = entityManager.createNativeQuery(SQL_GET_ALL_CUSTOM, "SchoolSubjectStudyProgramMapping");
        return query.getResultList();
    }

    @Override
    public SchoolSubjectStudyProgram getByIdCustom(Integer id) {
        Query query = entityManager.createNativeQuery(SQL_GET_BY_ID_CUSTOM, "SchoolSubjectStudyProgramMapping");
        query.setParameter(1, id);
        if (query.getResultList() == null || query.getResultList().isEmpty())
            return null;
        return (SchoolSubjectStudyProgram) query.getResultList().get(0);
    }
}
