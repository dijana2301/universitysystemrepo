package ba.telegroup.university_system.model.modelCustom;


import ba.telegroup.university_system.model.Teacher;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

@SqlResultSetMapping(
        name = "TeacherTitleMapping",
        classes = @ConstructorResult(
                targetClass = TeacherTitle.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "first_name", type = String.class),
                        @ColumnResult(name = "last_name", type = String.class),
                        @ColumnResult(name = "date_of_birth", type = Date.class),
                        @ColumnResult(name = "address", type = String.class),
                        @ColumnResult(name = "created_at", type = Date.class),
                        @ColumnResult(name = "active", type = Byte.class),
                        @ColumnResult(name = "title_id", type = Integer.class),
                        @ColumnResult(name = "university_id", type = Integer.class),
                        @ColumnResult(name = "title_name", type = String.class),
                        @ColumnResult(name = "university_name", type = String.class)

                }
        )
)

@MappedSuperclass
public class TeacherTitle extends Teacher {

    private String titleName;
    private String universityName;

    public TeacherTitle() {
    }

    public TeacherTitle(Integer id, String firstName, String lastName, Date dateOfBirth, String address, Date createdAt, Byte active, Integer titleId, Integer universityId, String titleName, String universityName) {
        super(id, firstName, lastName, dateOfBirth, address, createdAt != null ? new Timestamp(createdAt.getTime()) : null, active, titleId, universityId);
        this.titleName = titleName;
        this.universityName = universityName;

    }

    public String getTitleName() {
        return titleName;
    }

    public void setTitleName(String titleName) {
        this.titleName = titleName;
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
        TeacherTitle that = (TeacherTitle) o;
        return Objects.equals(titleName, that.titleName) &&
                Objects.equals(universityName, that.universityName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), titleName, universityName);
    }
}
