package ba.telegroup.university_system.model.modelCustom;

import ba.telegroup.university_system.model.Student;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.MappedSuperclass;
import javax.persistence.SqlResultSetMapping;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Objects;

@SqlResultSetMapping(
        name = "StudentStudyProgramMapping",
        classes = @ConstructorResult(
                targetClass = StudentStudyProgram.class,
                columns = {
                        @ColumnResult(name = "id", type = Integer.class),
                        @ColumnResult(name = "first_name", type = String.class),
                        @ColumnResult(name = "last_name", type = String.class),
                        @ColumnResult(name = "date_of_birth", type = Date.class),
                        @ColumnResult(name = "address", type = String.class),
                        @ColumnResult(name = "created_at", type = Date.class),
                        @ColumnResult(name = "active", type = Byte.class),
                        @ColumnResult(name = "study_program_id", type = Integer.class),
                        @ColumnResult(name = "university_id", type = Integer.class),
                        @ColumnResult(name = "num_registration", type = String.class),
                        @ColumnResult(name = "study_program_name", type = String.class),
                        @ColumnResult(name = "university_name", type = String.class)
                }
        )
)

@MappedSuperclass
public class StudentStudyProgram extends Student {


    private String studyProgramName;
    private String universityName;

    public StudentStudyProgram() {
    }

    public StudentStudyProgram(Integer id, String firstName, String lastName, java.sql.Date dateOfBirth, String address, Timestamp createdAt, Byte active, Integer studyProgramId, Integer universityId, String numRegistration, String studyProgramName, String universityName) {
        super(id, firstName, lastName, dateOfBirth, address, createdAt, active, studyProgramId, universityId, numRegistration);
        this.studyProgramName = studyProgramName;
        this.universityName = universityName;
    }

    public String getStudyProgramName() {
        return studyProgramName;
    }

    public void setStudyProgramName(String studyProgramName) {
        this.studyProgramName = studyProgramName;
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
        StudentStudyProgram that = (StudentStudyProgram) o;
        return Objects.equals(studyProgramName, that.studyProgramName) &&
                Objects.equals(universityName, that.universityName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), studyProgramName, universityName);
    }
}
