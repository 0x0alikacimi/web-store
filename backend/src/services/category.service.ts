import { CategoryRepository } from '../repositories/category.repository';
import { AppError } from '../errors/AppError';

export const CategoryService =
{
	getAllCategories: () =>
	{
		return CategoryRepository.findAll();
	},

	getCategoryById: (id: number) =>
	{
		const category = CategoryRepository.findById(id);
		if (!category)
			throw new AppError(404, 'NOT_FOUND', 'Category not found');
		return category;
	}
};
