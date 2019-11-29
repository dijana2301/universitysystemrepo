package ba.telegroup.university_system.util;

public class Value {
    private Integer id;
    private String value;

    public Value() {
        super();
    }

    public Value(Integer id, String value) {
        this.id = id;
        this.value = value;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "Value{" +
                "id=" + id +
                ", value='" + value + '\'' +
                "} " + super.toString();
    }
}
