import React from 'react';
import styled from 'styled-components';
import Logo from 'assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import Select from '../select/Select';
import Button from '../button/Button';

const Nav = styled.nav`
  height: 100%;
  border-right: 1px ${(props) => props.theme.colours.grey} solid;
  padding: ${(props) => props.theme.innerSpacing.large};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  margin-right: ${(props) => props.theme.outerSpacing.small};
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryLink = styled(Link)`
  color: ${(props) => props.theme.colours.black};
  text-decoration: none;
  margin: ${(props) => `calc(${props.theme.outerSpacing.tiny} / 2)`};
`;

const SubCategoryLink = styled(CategoryLink)`
  margin-left: ${(props) => props.theme.outerSpacing.small};
  
  &:first-child {
    margin-top: calc(${(props) => props.theme.outerSpacing.small}/2);
  }
  
  &:last-child {
    margin-bottom: calc(${(props) => props.theme.outerSpacing.small}/2);
  }
`;

const SubCategories = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectSelect = styled(Select)`
  margin-top: ${(props) => props.theme.outerSpacing.medium};
  margin-bottom: ${(props) => props.theme.outerSpacing.medium};
`;

const NewCategoryButton = styled(Button)`
  margin-top: ${(props) => props.theme.outerSpacing.medium}
`;

export default function SideNav() {
  const availableProjects = ['Taylor Home', 'Garden'];
  const activeCategories: Record<string, string[]> = {
    Kitchen: ['Cabinets', 'Windows'],
    Bathroom: [],
    Wardrobe: [],
    'Bedroom 1': [],
    'Bedroom 2': [],
    Bathtubs: [],
  };

  return (
    <Nav>
      <LogoContainer>
        <LogoImage src={Logo} alt="" />
        <h3>Design Tree</h3>
      </LogoContainer>
      <ProjectSelect values={availableProjects} />
      <Categories role="list">
        {
          Object.keys(activeCategories).map((category) => (
            <React.Fragment key={category}>
              <CategoryLink role="listitem" to="#">{category}</CategoryLink>
              {
                activeCategories[category].length > 1
                  ? (
                    <SubCategories>
                      {activeCategories[category].map((subCategory) => (
                        <SubCategoryLink role="listitem" to="#" key={subCategory}>{subCategory}</SubCategoryLink>
                      ))}
                    </SubCategories>
                  )
                  : ''
              }
            </React.Fragment>
          ))
        }
      </Categories>
      <NewCategoryButton inline>
        + New Category
      </NewCategoryButton>
    </Nav>
  );
}
