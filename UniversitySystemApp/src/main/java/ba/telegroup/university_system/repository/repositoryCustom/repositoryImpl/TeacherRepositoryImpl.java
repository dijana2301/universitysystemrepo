package ba.telegroup.university_system.repository.repositoryCustom.repositoryImpl;

import ba.telegroup.university_system.model.modelCustom.TeacherTitle;
import ba.telegroup.university_system.repository.repositoryCustom.TeacherRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class TeacherRepositoryImpl implements TeacherRepositoryCustom {

    private static final String SQL_GET_ALL_CUSTOM = "select t.*,ti.name as title_name,u.`name` as university_name from teacher t inner join title ti on t.title_id=ti.id inner join university u on t.university_id=u.id where t.active=1";

    private static final String SQL_GET_BY_ID_CUSTOM = "select t.*,ti.name as title_name,u.`name` as university_name from teacher t inner join title ti on t.title_id=ti.id inner join university u on t.university_id=u.id where t.active=1 and t.id=?";

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<TeacherTitle> getAllCustom() {
        Query query = entityManager.createNativeQuery(SQL_GET_ALL_CUSTOM, "TeacherTitleMapping");
        return query.getResultList();
    }

    @Override
    public TeacherTitle getByIdCustom(Integer id) {
        Query query = entityManager.createNativeQuery(SQL_GET_BY_ID_CUSTOM, "TeacherTitleMapping");
        query.setParameter(1, id);
        if (query.getResultList() == null || query.getResultList().isEmpty())
            return null;
        return (TeacherTitle) query.getResultList().get(0);
    }
}
