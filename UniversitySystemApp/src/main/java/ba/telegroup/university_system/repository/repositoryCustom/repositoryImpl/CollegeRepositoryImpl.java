package ba.telegroup.university_system.repository.repositoryCustom.repositoryImpl;

import ba.telegroup.university_system.model.modelCustom.CollegeUniversity;
import ba.telegroup.university_system.repository.repositoryCustom.CollegeRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class CollegeRepositoryImpl implements CollegeRepositoryCustom {

    private static final String SQL_GET_ALL_CUSTOM = "select c.*,u.name as university_name from college c inner join university u on c.university_id=u.id where c.active=1";

    private static final String SQL_GET_BY_ID_CUSTOM = "select c.*,u.name as university_name from college c inner join university u on c.university_id=u.id where c.active=1 and c.id=?";

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<CollegeUniversity> getAllCustom() {
        Query query = entityManager.createNativeQuery(SQL_GET_ALL_CUSTOM, "CollegeUniversityMapping");
        return query.getResultList();
    }

    @Override
    public CollegeUniversity getByIdCustom(Integer id) {
        Query query = entityManager.createNativeQuery(SQL_GET_BY_ID_CUSTOM, "CollegeUniversityMapping");
        query.setParameter(1, id);
        if (query.getResultList() == null || query.getResultList().isEmpty())
            return null;
        return (CollegeUniversity) query.getResultList().get(0);
    }
}
