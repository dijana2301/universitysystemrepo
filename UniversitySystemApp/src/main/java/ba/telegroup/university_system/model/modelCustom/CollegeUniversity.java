package ba.telegroup.university_system.model.modelCustom;

import ba.telegroup.university_system.model.College;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

@SqlResultSetMapping(
        name = "CollegeUniversityMapping",
        classes = @ConstructorResult(
                targetClass = CollegeUniversity.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "address", type = String.class),
                        @ColumnResult(name = "date_of_foundation", type = Date.class),
                        @ColumnResult(name = "created_at", type = Date.class),
                        @ColumnResult(name = "active", type = Byte.class),
                        @ColumnResult(name = "university_id", type = Integer.class),
                        @ColumnResult(name = "university_name", type = String.class),
                }
        )
)

@MappedSuperclass
public class CollegeUniversity extends College {

    private String universityName;

    public CollegeUniversity() {
    }

    public CollegeUniversity(Integer id, String name, String address, Date dateOfFoundation, Date createdAt, Byte active, Integer universityId, String universityName) {
        super(id, name, address, dateOfFoundation, createdAt != null ? new Timestamp(createdAt.getTime()) : null, active, universityId);
        this.universityName = universityName;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        CollegeUniversity that = (CollegeUniversity) o;
        return Objects.equals(universityName, that.universityName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), universityName);
    }
}
