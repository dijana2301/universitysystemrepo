package ba.telegroup.university_system.model.modelCustom;

import ba.telegroup.university_system.model.StudyProgram;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

@SqlResultSetMapping(
        name = "StudyProgramCollegeMapping",
        classes = @ConstructorResult(
                targetClass = StudyProgramCollege.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "num_of_years", type = Integer.class),
                        @ColumnResult(name = "ects", type = Integer.class),
                        @ColumnResult(name = "created_at", type = Date.class),
                        @ColumnResult(name = "active", type = Byte.class),
                        @ColumnResult(name = "college_id", type = Integer.class),
                        @ColumnResult(name = "college_name", type = String.class)

                }
        )
)

@MappedSuperclass
public class StudyProgramCollege extends StudyProgram {

    private String collegeName;

    public StudyProgramCollege() {
    }

    public StudyProgramCollege(Integer id, String name, Integer numOfYears, Integer ects, Date createdAt, Byte active, Integer collegeId, String collegeName) {
        super(id, name, numOfYears, ects, createdAt != null ? new Timestamp(createdAt.getTime()) : null, active, collegeId);
        this.collegeName = collegeName;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        collegeName = collegeName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        StudyProgramCollege that = (StudyProgramCollege) o;
        return Objects.equals(collegeName, that.collegeName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), collegeName);
    }
}

