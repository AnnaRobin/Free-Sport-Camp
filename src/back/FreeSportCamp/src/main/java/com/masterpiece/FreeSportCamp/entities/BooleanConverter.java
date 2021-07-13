package com.masterpiece.FreeSportCamp.entities;

import javax.persistence.AttributeConverter;

/**
 * AttributeConverter : A class that implements this interface can be used to
 * convert entity attribute state into database column representation and back
 * again. Note that the X and Y types may be the same Java type.
 *
 * @param <Boolean> the type of the entity attribute
 * @param <String> the type of the database column
 * 
 *            A custom converter to convert entity {@code Boolean} attribute
 *            state into database column representation and back again.
 *            <p>
 *            This implementation converts {@code Boolean} from/to
 *            {@code String}s such as:
 *            <ul>
 *            <li>{@code Boolean.TRUE} from/to {@code "T"}
 *            <li>{@code Boolean.FALSE} from/to {@code "F"}
 *            </ul>
 */

public class BooleanConverter implements AttributeConverter<Boolean, Integer> {

	@Override
	public Integer convertToDatabaseColumn(Boolean value) {
		return Boolean.TRUE.equals(value) ? 1 : 0;
	}

	@Override
	public Boolean convertToEntityAttribute(Integer value) {
		return 1 == value;
	}
}
