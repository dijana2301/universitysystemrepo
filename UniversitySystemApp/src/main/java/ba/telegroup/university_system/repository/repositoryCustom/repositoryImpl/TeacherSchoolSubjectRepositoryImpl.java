package ba.telegroup.university_system.repository.repositoryCustom.repositoryImpl;

import ba.telegroup.university_system.model.modelCustom.TeacherSchoolSubjectTeacherSchoolSubject;
import ba.telegroup.university_system.repository.repositoryCustom.TeacherSchoolSubjectRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class TeacherSchoolSubjectRepositoryImpl implements TeacherSchoolSubjectRepositoryCustom {

    private static final String SQL_GET_ALL_CUSTOM = "select tss.*,t.first_name as teacher_name,ss.`name` as school_subject_name from teacher_school_subject tss inner join teacher t on tss.teacher_id = t.id  inner join school_subject ss on tss.school_subject_id = ss.id where ss.active=1 and t.active=1";

    private static final String SQL_GET_BY_ID_CUSTOM = "select tss.*,t.first_name as teacher_name,ss.`name` as school_subject_name from teacher_school_subject tss inner join teacher t on tss.teacher_id = t.id inner join school_subject ss on tss.school_subject_id = ss.id where ss.active=1 and t.active=1 and tss.id=?";


    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<TeacherSchoolSubjectTeacherSchoolSubject> getAllCustom() {
        Query query = entityManager.createNativeQuery(SQL_GET_ALL_CUSTOM, "TeacherSchoolSubjectTeacherSchoolSubjectMapping");
        return query.getResultList();
    }

    @Override
    public TeacherSchoolSubjectTeacherSchoolSubject getByIdCustom(Integer id) {
        Query query = entityManager.createNativeQuery(SQL_GET_BY_ID_CUSTOM, "TeacherSchoolSubjectTeacherSchoolSubjectMapping");
        query.setParameter(1, id);
        if (query.getResultList() == null || query.getResultList().isEmpty())
            return null;
        return (TeacherSchoolSubjectTeacherSchoolSubject) query.getResultList().get(0);
    }
}
